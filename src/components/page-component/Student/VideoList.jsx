import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function CourseVideoList() {
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/teacher/teaching/${courseId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Lấy danh sách video thất bại");
        return res.json();
      })
      .then((data) => {
        setVideos(data.courseData || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [courseId]);

  if (loading) return <p>Đang tải video...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (videos.length === 0) return <p>Khóa học chưa có video nào.</p>;

  return (
    <div>
      <h2>Danh sách video khóa học</h2>
      <ul>
        {videos.map((video) => (
          <li key={video._id}>
            <h3>{video.title}</h3>
            <p>{video.videoDescription}</p>
            {/* Link xem từng video cụ thể (nếu có route) */}
            <Link to={`/student/course/${courseId}/watch/${video._id}`}>
              Xem video
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseVideoList;
