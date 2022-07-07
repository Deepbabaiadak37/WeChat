import './Register.css';
import logo from '../assets/logo2.png';

function Register() {
    return ( 
        <div style={{ backgroundColor:'#0074D9',color:'white'}}>
            
            <div className="reg-form">
            
                <form >
                    <div>
                        <div style={{ display:'inline-block'}}>
                            <img src={logo} height="50" width="50" style={{ alignItems:'center',gap:'1rem',justifyContent:'center'}}/>
                        </div>
                        <div style={{ display:'inline-block',verticalAlign: "middle"}}>
                            <h2>&nbsp;WE <span style={{ color: '#0074D9',fontSize:'33px'}}>CHAT</span></h2>
                        </div>
                    </div>
                    
                    <input name="name" type="text" placeholder="Enter Your Name" />

                    <input name="password" type="password" placeholder="Enter Password"/>

                    <button>SignUp</button>
                </form>
            </div>
        </div>
    );
}

export default Register;