import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses" className="row">

        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
          <div className="card rounded-3 overflow-hidden">
            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                  to="/Kanbas/Courses/1234/Home">
              <img src="/images/reactjs.jpg" width="100%" height={160}/>
              <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                  CS1234 React JS
                </h5>
                <p className="wd-dashboard-course-title card-text">
                  Full Stack Software Developer
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
        </div>

        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
          <div className="card rounded-3 overflow-hidden">
            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                  to="/Kanbas/Courses/5678/Home">
              <img src="/images/nodejs.jpg" width="100%" height={160}/>
              <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                  CS5678 Node JS
                </h5>
                <p className="wd-dashboard-course-title card-text">
                  Using Node JS
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
        </div>

        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
          <div className="card rounded-3 overflow-hidden">
            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                  to="/Kanbas/Courses/9876/Home">
              <img src="/images/webdev.jpg" width="100%" height={160}/>
              <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                  CS9876 Web Development
                </h5>
                <p className="wd-dashboard-course-title card-text">
                  Intro to Web Development
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
        </div>

        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
          <div className="card rounded-3 overflow-hidden">
            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                  to="/Kanbas/Courses/1111/Home">
              <img src="/images/list.jpg" width="100%" height={160}/>
              <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                  CS1111 Lists
                </h5>
                <p className="wd-dashboard-course-title card-text">
                  Intro to List Tags
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
        </div>

        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
          <div className="card rounded-3 overflow-hidden">
            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                  to="/Kanbas/Courses/2222/Home">
              <img src="/images/css.jpg" width="100%" height={160}/>
              <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                  CS2222 CSS
                </h5>
                <p className="wd-dashboard-course-title card-text">
                  Intro to CSS
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
        </div>

        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
          <div className="card rounded-3 overflow-hidden">
            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                  to="/Kanbas/Courses/3333/Home">
              <img src="/images/javascript.jpg" width="100%" height={160}/>
              <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                  CS3333 JavaScript
                </h5>
                <p className="wd-dashboard-course-title card-text">
                  Intro to JavaScript
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
        </div>

        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
          <div className="card rounded-3 overflow-hidden">
            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                  to="/Kanbas/Courses/4444/Home">
              <img src="/images/websec.jpg" width="100%" height={160}/>
              <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                  CS4444 Website Security
                </h5>
                <p className="wd-dashboard-course-title card-text">
                  Properly Securing a Website
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}