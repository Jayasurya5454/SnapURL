import React, { useState, useEffect } from "react";
import Loader from './Loader';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { User, BarChart2, DollarSign, Users, Lock, QrCode, Home } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Analytics.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658"];

const Analytics = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;
  const [data, setData] = useState({
    stats: [],
    urlsOverTime: [],
    clicksOverTime: [],
    detailedUrls: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/analytics/${userId}`
        );
        const result = await response.json();
        console.log("Fetched Analytics Data:", result);

        if (result.stats.totalUrls === 0) {
          navigate("/dashboard", { state: { userId: userId } });
          return;
        }

        const stats = [
          {
            label: "Total URLs",
            value: result.stats.totalUrls || 0,
            change: result.stats.totalUrlsChange || "+0%",
            icon: <BarChart2 className="stat-icon" />,
            backgroundColor: "#f0f8ff",
          },
          {
            label: "Total Clicks",
            value: result.stats.totalClicks || 0,
            change: result.stats.totalClicksChange || "+0%",
            icon: <User className="stat-icon" />,
            backgroundColor: "#f0f8ff",
          },
          {
            label: "Most Clicked Alias",
            value: result.stats.mostClickedUrl || "N/A",
            change: result.stats.mostClickedUrlChange || "+0%",
            icon: <DollarSign className="stat-icon" />,
            backgroundColor: "#f0f8ff",
          },
          {
            label: "Highest Clicks",
            value: result.stats.mostClickedUrlClicks || 0,
            change: result.stats.mostClickedUrlClicksChange || "+0%",
            icon: <Users className="stat-icon" />,
            backgroundColor: "#f0f8ff",
          },
          {
            label: "Avg Clicks/URL",
            value: result.stats.averageClicksPerUrl || 0,
            change: result.stats.averageClicksPerUrlChange || "+0%",
            icon: <BarChart2 className="stat-icon" />,
            backgroundColor: "#f0f8ff",
          },
          {
            label: "Password-Protected URLs",
            value: result.stats.passwordProtectedUrls || 0,
            change: result.stats.passwordProtectedUrlsChange || "+0%",
            icon: <Lock className="stat-icon" />,
            backgroundColor: "#f0f8ff",
          },
          {
            label: "QR Code URLs",
            value: result.stats.qrCodeUrls || 0,
            change: result.stats.qrCodeUrlsChange || "+0%",
            icon: <QrCode className="stat-icon" />,
            backgroundColor: "#f0f8ff",
          },
          {
            label:<p style={{ color: "#424949" }}><strong>Click to create Snapurl🎯</strong></p>,
            value: <p style={{ color: "#273746" }}><strong>Snap Your URL</strong></p>,
            change: "",
            icon: <Home className="stat-icon" style={{ color: "#FF5733" }} />,
            onClick: () => navigate("/dashboard", { state: { userId: userId } }),
          },
        ];

        setData({
          stats,
          urlsOverTime: result.urlsOverTime || [],
          clicksOverTime: result.clicksOverTime || [],
          detailedUrls: result.detailedUrls || [],
        });
        toast.success("Click Snap Your URL card to Snap it!", {
          position: "top-right",
          autoClose: 9000,
          
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchAnalytics();
  }, [userId, navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Loader className="display-1"/>
      </div>
    );
  }

  return (
    <div className="analytics-container">
            <ToastContainer />

      <div className="stats-grid">
        {data.stats.map((stat, index) => (
          <div key={index} className="stat-card" onClick={stat.onClick}>
            <div className="stat-content">
              {stat.icon}
              <div>
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            </div>
            <span className="stat-change">{stat.change}</span>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3 className="chart-title">URLs Created Over Time</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.urlsOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Clicks Over Time</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data.clicksOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="clicks" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Clicks Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data.stats.filter(stat => typeof stat.value === "number")}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
              >
                {data.stats.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="url-grid">
        {data.detailedUrls.map((url, index) => (
          <div key={index} className="url-card">
            <p>
              <strong>Short URL:</strong>{" "}
              <a
                href={`https://snappedurl.onrender.com/${url.shortUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                https://snappedurl.onrender.com/{url.shortUrl}
              </a>
            </p>
            <p>
              <strong>Original URL:</strong>{" "}
              <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                {url.originalUrl}
              </a>
            </p>
            <img src={url.qrCode} alt="QR Code" className="qr-code" />
            <p><strong>URL Hits:</strong> {url.clicks}</p>
            <p><strong>Maximum Hits Allowed:</strong> {url.maxClicks ? url.maxClicks : "Unlimited"}</p>
            <p>
              <strong>Password Protected:</strong>{" "}
              {url.password ? "Yes" : "No"}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(url.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
