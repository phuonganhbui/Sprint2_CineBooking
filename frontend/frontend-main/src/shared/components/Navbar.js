import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Modal from './Modal';
import Button from './Button';

import axios from 'axios';

import { AuthContext } from '../context/auth-context';

import './Navbar.css';

function Navbar({ tab }) {
  const auth = useContext(AuthContext);

  const [isLoggedIn, setIsLoggedIn] = useState(auth.isLoggedIn);

  const logout = () => {
    setIsLoggedIn(!isLoggedIn);
    auth.logout();
  };

  const [showMenu, setShowMenu] = useState(false);
  // const [tab, setTab] = useState(1);

  const [modalIsShown, setModalIsShown] = useState(false);

  const closeModal = () => {
    setModalIsShown(false);
  };

  const [message, setMessage] = useState([]);

  const fetchMessage = () => {
    axios({
      method: 'get',
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: '/v1/auth/me',
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => {
        setMessage(res.data.user.message);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios({
        method: 'get',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: '/v1/auth/me',
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
        .then((res) => {
          setMessage(res.data.user.message);
        })
        .catch((err) => {});
    }, 1000 * 60 * 1);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Fragment>
      <Modal
        onCancel={closeModal}
        header="Oops..."
        show={modalIsShown}
        footer={
          <>
            <span className="close-modal-btn" onClick={closeModal}>
              Hủy
            </span>
            <Button>
              <Link to={'/authentication'} onClick={closeModal}>
                <p className="confirm-login-btn">Đăng nhập</p>
              </Link>
            </Button>
          </>
        }
      >
        <p>Bạn cần đăng nhập để thực hiện tác vụ này</p>
      </Modal>
      <div className="navbar-container">
        <div className="navbar">
          <div className="navbar-logo">
            <Link to={'/'}>
              <img
                src="https://lh3.googleusercontent.com/fife/AAWUweXGgBABUnawdjQgMGem3M0sfske9ugy-XgOCFNoEn-f4_SLOnA0a38uznjjV_UQUM60PD6xCAZAp9duJ6TrqOZbIBbbmu-V6oTWhCN_hzVRybU78SXoBbMlq3cIXF_noI1Yuekb1v7SMatGU03_cr-vC8YIfQVdGwegFPV00IveUB3wyIvGoScAD07Wn-rF2beSV6MXthH3Y2sSzERn0mUfAfL5wLGspWCLbhjCSdl28SPSlVMmlVRbl8OkB7GmNclhH1cR9T94_4oba3_gtPg86jBGdRY0dQq4SPwi6DN3CTFzYoQ_W3pvESpBTRltmXpg_X5VcZavLQCN8kR1aBvi7OjpC8ZVted316m5I80LEWhIilbCquACjNQVNF1sZv9WF3czr1SxMFQb-XuXN3qRg3xuiyHJ_hF6QsZ1a9ZlWuGLNll7qc73sI_teS0iL_KVrlDrjAubn0MflhdPM1zz2jlrK1oc9J2fiL4miOqLiw1ZV_zKb83pTxGJ4sJLjsf5Kfx0FD9b5-p7g5zruVeUg8ubiSwIrg9_QDxteZt3ehHAWcdjXMg11XvfWB1mGR1V-YGaN4adYVQRrL5h51C131jk-Ht-vEik3Oe8NsupgvO0sSKuQ2MInSmIJcCdsK2Lehmbkn1DMB8BiKromo4DsiHNkrXqmdk_bfOGmdgZVYdWcl2EQgJh2Qhcy-6EKDF-jNe29OTBxuYSdiGUabVJgQfYsrTWQxg=w400-h380-p-k-nu"
                alt=""
              />
            </Link>
          </div>
          <div className="navbar-tab">
            <ul>
              <li>
                <a
                  href="/"
                  className={tab === 1 ? 'active' : null}
                  // onClick={() => setTab(1)}
                >
                  Trang chủ
                </a>
              </li>
              <li>
                <a
                  href=""
                  className={tab === 2 ? 'active' : null}
                  // onClick={() => setTab(2)}
                >
                  Phim
                </a>
              </li>
              <li>
                {isLoggedIn ? (
                  <a
                    href={`/library`}
                    className={tab === 3 ? 'active' : null}
                    // onClick={() => setTab(3)}
                  >
                    Thư viện
                  </a>
                ) : (
                  <a
                    className={tab === 3 ? 'active' : null}
                    onClick={setModalIsShown.bind(true)}
                  >
                    Thư viện
                  </a>
                )}
              </li>
            </ul>
          </div>
          <div className="navbar-auth">
            {isLoggedIn ? (
              <div className="navbar-user">
                <img
                  src="http://cdn.onlinewebfonts.com/svg/img_568656.png"
                  alt=""
                  onClick={() => setShowMenu((e) => !e)}
                />
                {showMenu ? (
                  <div className="nav-menu-box">
                    <Link to={`/notifications`}>
                      <p>Thông báo</p>
                      {message && message.length > 0 && (
                        <div className="push-noti">{message.length}</div>
                      )}
                    </Link>
                    <Link to={`/library`}>
                      <p>Thư viện</p>
                    </Link>
                    {auth.isAdmin && auth.isAdmin !== 'user' && (
                      <Link to={`/admin/dashboard`}>
                        <p>Quản trị</p>
                      </Link>
                    )}
                    <p onClick={logout}>Đăng xuất</p>
                  </div>
                ) : null}
              </div>
            ) : (
              <>
                <a href="/authentication/?register=true">Đăng kí</a>
                <a href="/authentication" className="active">
                  Đăng nhập
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Navbar;
