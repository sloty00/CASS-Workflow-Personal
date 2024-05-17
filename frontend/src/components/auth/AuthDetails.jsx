import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';

function AuthDetails() {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });

        // Devolver una función de limpieza que se ejecutará cuando el componente se desmonte
        return () => {
            unsubscribe();
        };
    }, []);

    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log('sign out successful');
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <div>Auth Details</div>
            <div>
                {authUser ? (
                    <>
                        <p>{`Signed In as ${authUser.email}, UID: ${authUser.uid}`}</p>
                        <button onClick={userSignOut}>Sign Out</button>
                    </>
                ) : (
                    <p>Signed Out</p>
                )}
            </div>
        </div>
    )
}

export default AuthDetails;