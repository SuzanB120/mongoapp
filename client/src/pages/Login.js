import React, {useState} from 'react';
import { FaUser } from 'react-icons/fa';

function Login() {

  const [formData, setFormData] = useState({
    emile: '',
    password:''
  });

  return (
    <>
        <section>
          <h1 className='headline'><FaUser /> Login to MarketApp</h1>
        </section>

        <section>
          <form>
            <div>
              <input
                type="email"
                id='emile'
                name='email'
                placeholder='Please enter your email'
                onChange={onChangeText}
              />
            </div>
          </form>
        </section>

    </>
  )
}

export default Login