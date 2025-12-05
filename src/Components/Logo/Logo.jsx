import logo from '../../assets/athurs/logo.png'

const Logo = () => {
    return (
        <div className='flex items-end'>
            <img src={logo} alt="logo" />
            <h2 className='text-2xl font-bold -ml-2.5'>ZapShift</h2>
        </div>
    );
};

export default Logo;