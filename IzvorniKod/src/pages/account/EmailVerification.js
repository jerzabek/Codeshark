import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { verifyAccount } from '../../API'
import { HOME, LOGIN } from '../../Routes'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function EmailVerification(props) {
  const { token } = useParams()

  useEffect(() => {
    const attemptVerification = async () => {
      try {
        const res = await verifyAccount(token)

        if (res.success) {
          MySwal.fire({
            title: <p>Successfully verified account!</p>,
            html: <p>You will now be redirected to the login page</p>,
            icon: 'success'
          }).then(() => window.location.href = LOGIN)
        } else {
          MySwal.fire({
            title: <p>Could not verify account!</p>,
            html: <p>{res.error}</p>,
            icon: 'error'
          }).then(() => window.location.href = HOME)
        }
      } catch (err) {
        if (typeof err === 'object') {
          MySwal.fire({
            title: <p>An error unknown error occurred :(</p>,
            icon: 'error'
          }).then(() => window.location.href = HOME)

          return
        }

        MySwal.fire({
          title: <p>An error ocurred!</p>,
          html: <p>{err}</p>,
          icon: 'error'
        }).then(() => window.location.href = HOME)
      }
    }

    attemptVerification()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container py-4'>
      <div className="d-flex flex-row align-items-baseline">
        <h1>Verifying your account, please wait a moment...</h1>
        <div className="ms-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>

      <p className="text-muted">If you wait longer than 5 seconds, click <a href={token} >here</a></p>
    </div>
  );
}

export default EmailVerification;