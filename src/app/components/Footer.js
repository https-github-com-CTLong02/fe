function Footer() {
    return (
        <footer style={{ background: 'rgb(46, 98, 233)' }} className="position-fixed bottom-0 start-0 end-0">
            <div className="container-xl py-3">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <div>
                        <p style={{ fontSize: '1rem', fontWeight: 500, lineHeight: '1.5rem', color: '#fff' }}>
                            Mọi vấn đề thắc mắc xin vui lòng liên hệ thư viện theo{' '}
                            <a role="button" style={{ fontStyle: 'italic' }}>
                                email: thuvien@hust.sis.edu.vn
                            </a>{' '}
                            để được hướng dẫn chi tiết
                        </p>
                    </div>
                    <div>
                        <button
                            style={{
                                color: 'rgb(46, 98, 233',
                                background: '#fff',
                                border: 'none',
                                borderRadius: '20px',
                                fontSize: '1.2rem',
                                fontWeight: 600,
                            }}
                            className="px-4 py-3"
                        >
                            <i className="fa-duotone fa-books"></i>
                            <span className="mx-2">Thư viện điện tử - Đại học Bách Khoa Hà Nội</span>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
