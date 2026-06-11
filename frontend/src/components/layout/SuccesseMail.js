import { useLocation } from 'react-router-dom';

const SuccesseMail = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const success = query.get('success');

    return (
        <div>
            {success === 'true' && <p>Email successfully added!</p>}
        </div>
    );
};

export default SuccesseMail;