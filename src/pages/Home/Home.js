import clsx from 'clsx';
import styles from './Home.module.scss';
import { Fade } from 'react-reveal';
import Footer from '~/app/components/Footer';
import imgBanner from '~/assets/images/img_banner.png';
function Home() {
    return (
        <div className={styles.banner}>
            <div className="container-xl d-flex align-items-center flex-wrap" style={{ minHeight: 600 }}>
                <Fade right>
                    <div className="col-md-6 col-12">
                        <h3>Chào mừng các bạn đến với thư viện số</h3>
                        <div>
                            <h3>Thư viện số</h3>
                            <p>
                                Thư viện số đươc xây dựng dựa trên nguồn tài liệu nội sinh của trường. Các nguồn bài
                                giảng giáo trình do thầy cô là giảng viên của trường biên soạn. Ngoài ra còn có bộ sưu
                                tập luận văn của sinh viên trường đóng góp. Để sử dụng nguồn tài liệu nội sinh - Độc giả
                                cần có tài khoản sử dụng Thư viện số được cung cấp bởi thư viện.
                            </p>
                        </div>
                    </div>
                </Fade>
                <div className="col-md-6 col-12 d-flex justify-content-center align-items-end">
                    <Fade left>
                        <img src={imgBanner}></img>
                    </Fade>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Home;
