import './Register.css';
import logo from '../assets/logo2.png';
import Header from '../components/Header';


function Register() {
    return ( 
        <>


        <div style={{ backgroundColor:'#0074D9',color:'white'}}>
            <div className="reg-form">
                <form >
                    <div className='d-flex justify-content-center'>
                        <div style={{ display:'inline-block'}}>
                            <img src={logo} height="50" width="50" style={{ alignItems:'center',gap:'1rem',justifyContent:'center'}}/>
                        </div>
                        <div style={{ display:'inline-block',verticalAlign: "middle"}}>
                            <h2 style={{ fontSize:'33px'}}>&nbsp;WE <span style={{ color: '#0074D9',fontSize:'33px'}}>CHAT</span></h2>
                        </div>
                    </div>
                    
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping"> <i class="fa fa-user-circle-o" aria-hidden="true"></i> </span>
                        <input type="text" class="form-control" placeholder="Username" />
                    </div>
                   
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping"> <i class="fa fa-envelope" aria-hidden="true"></i> </span>
                        <input type="email" class="form-control" placeholder="Email" />
                    </div>

                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping"> <i class="fa fa-key" aria-hidden="true"></i> </span>
                        <input type="password" class="form-control" placeholder="Password" />
                    </div>

                    <div class="input-group flex-nowrap">
                        <span  class="input-group-text" id="addon-wrapping">  <i  class="fa fa-key" aria-hidden="true"></i>  </span>
                        <input type="password" class="form-control" placeholder="Confirm password" />
                        
                    </div>

                    <button>SignUp</button><hr></hr>
                    <span>Already have account &nbsp;&nbsp;<a href='/login'>Login</a></span>
                </form>
            </div>
        </div>
        </>
    );
}

export default Register;



