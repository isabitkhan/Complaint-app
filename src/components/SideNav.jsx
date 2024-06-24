const SideNav = () => {
  return (
    <div className="">
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4 ">
        {/* Brand Logo */}

        {/* Sidebar */}

        <div className="sidebar">
          <nav className="mt-5">
            <ul
              className="nav nav-pills nav-sidebar    flex-column "
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <a href="/" className="nav-link ">
                  <i className="nav-icon fa fa-home" />
                  <p>Home</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Complaints" className="nav-link">
                  <i className="nav-icon fas fa-copy" />
                  <p>
                    Complaints
                    <span className="badge badge-info right"></span>
                  </p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/users" className="nav-link">
                  <i className="nav-icon fa fa-users" />
                  <p>Users</p>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default SideNav;
