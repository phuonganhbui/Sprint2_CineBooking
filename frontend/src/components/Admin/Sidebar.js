import React, { useEffect, useState } from 'react';
import './sidebar.scss';
import { Link, useLocation } from 'react-router-dom';
import { images } from '../../constants';
import sidebarNav from '../../configs/sidebarNav';

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const curPath = window.location.pathname.split('/')[1];
    const activeItem = sidebarNav.findIndex((item) => item.section === curPath);

    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  const closeSidebar = () => {
    document.querySelector('.main__content').style.transform =
      'scale(1) translateX(0)';
    setTimeout(() => {
      document.body.classList.remove('sidebar-open');
      document.querySelector('.main__content').style = '';
    }, 500);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <Link to={'/'}>
          <img
            src="https://lh3.googleusercontent.com/fife/AAWUweXGgBABUnawdjQgMGem3M0sfske9ugy-XgOCFNoEn-f4_SLOnA0a38uznjjV_UQUM60PD6xCAZAp9duJ6TrqOZbIBbbmu-V6oTWhCN_hzVRybU78SXoBbMlq3cIXF_noI1Yuekb1v7SMatGU03_cr-vC8YIfQVdGwegFPV00IveUB3wyIvGoScAD07Wn-rF2beSV6MXthH3Y2sSzERn0mUfAfL5wLGspWCLbhjCSdl28SPSlVMmlVRbl8OkB7GmNclhH1cR9T94_4oba3_gtPg86jBGdRY0dQq4SPwi6DN3CTFzYoQ_W3pvESpBTRltmXpg_X5VcZavLQCN8kR1aBvi7OjpC8ZVted316m5I80LEWhIilbCquACjNQVNF1sZv9WF3czr1SxMFQb-XuXN3qRg3xuiyHJ_hF6QsZ1a9ZlWuGLNll7qc73sI_teS0iL_KVrlDrjAubn0MflhdPM1zz2jlrK1oc9J2fiL4miOqLiw1ZV_zKb83pTxGJ4sJLjsf5Kfx0FD9b5-p7g5zruVeUg8ubiSwIrg9_QDxteZt3ehHAWcdjXMg11XvfWB1mGR1V-YGaN4adYVQRrL5h51C131jk-Ht-vEik3Oe8NsupgvO0sSKuQ2MInSmIJcCdsK2Lehmbkn1DMB8BiKromo4DsiHNkrXqmdk_bfOGmdgZVYdWcl2EQgJh2Qhcy-6EKDF-jNe29OTBxuYSdiGUabVJgQfYsrTWQxg=w400-h380-p-k-nu"
            alt=""
          />
        </Link>

        <div className="sidebar-close" onClick={closeSidebar}>
          <i className="bx bx-x"></i>
        </div>
      </div>
      <div className="sidebar__menu">
        {sidebarNav.map((nav, index) => (
          <Link
            to={nav.link}
            key={`nav-${index}`}
            className={`sidebar__menu__item ${
              activeIndex === index && 'active'
            }`}
            onClick={closeSidebar}
          >
            <div className="sidebar__menu__item__icon">{nav.icon}</div>
            <div className="sidebar__menu__item__txt">{nav.text}</div>
          </Link>
        ))}
        <div className="sidebar__menu__item">
          <div className="sidebar__menu__item__icon">
            <i className="bx bx-log-out"></i>
          </div>
          <div className="sidebar__menu__item__txt">Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
