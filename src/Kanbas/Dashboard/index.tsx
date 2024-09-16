import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">

        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" alt="logo" width={200} />
          <div>
            <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1234/Home">
              CS1234 React JS
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack Software Developer
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/nodejs.jpg" alt="logo" width={200} />
          <div>
            <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/5678/Home">
              CS5678 Node JS
            </Link>
            <p className="wd-dashboard-course-title">
              Using Node JS
            </p>
            <Link to="/Kanbas/Courses/5678/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/webdev.jpg" alt="logo" width={200} />
          <div>
            <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/9876/Home">
              CS9876 Web Development
            </Link>
            <p className="wd-dashboard-course-title">
              Intro to Web Development
            </p>
            <Link to="/Kanbas/Courses/9876/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/list.jpg" alt="logo" width={200} />
          <div>
            <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1111/Home">
              CS1111 Lists
            </Link>
            <p className="wd-dashboard-course-title">
              Intro to List Tags
            </p>
            <Link to="/Kanbas/Courses/1111/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/css.jpg" alt="logo" width={200} />
          <div>
            <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/2222/Home">
              CS2222 CSS
            </Link>
            <p className="wd-dashboard-course-title">
              Intro to CSS
            </p>
            <Link to="/Kanbas/Courses/2222/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/javascript.jpg" alt="logo" width={200} />
          <div>
            <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/3333/Home">
              CS3333 JavaScript
            </Link>
            <p className="wd-dashboard-course-title">
              Intro to JavaScript
            </p>
            <Link to="/Kanbas/Courses/3333/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/websec.jpg" alt="logo" width={200} />
          <div>
            <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/4444/Home">
              CS4444 Website Security
            </Link>
            <p className="wd-dashboard-course-title">
              Properly Securing a Website
            </p>
            <Link to="/Kanbas/Courses/4444/Home"> Go </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}