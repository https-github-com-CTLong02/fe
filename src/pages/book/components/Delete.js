function Delete(prop) {
    return (
        <div className="d-flex align-items-center h-100">
            {prop?.data.status === 'borrowed' ? (
                <button
                    className="px-3 d-flex align-items-center border-0 rounded-2"
                    style={{ backgroundColor: 'rgba(32,161,68,.1)', height: 24 }}
                >
                    <span style={{ color: '#3ace5a', fontSize: '1rem' }}>Trả sách</span>
                    <i className="fa-light fa-turn-down-left ms-2" style={{ color: '#3ace5a', fontWeight: 500 }}></i>
                </button>
            ) : (
                <></>
            )}
        </div>
    );
}

export default Delete;
