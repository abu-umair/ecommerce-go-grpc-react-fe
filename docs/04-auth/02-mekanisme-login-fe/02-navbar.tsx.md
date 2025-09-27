
---

## 3️⃣ 02-navbar.tsx.md

```markdown
# File: navbar.tsx

```tsx
import { Link, useLocation } from 'react-router-dom';
// Untuk navigasi antar halaman

import { useAuthStore } from '../../store/auth';
// Ambil status login dari store

function Navbar() {
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    // Ambil status login

    const { pathname } = useLocation();
    // Ambil URL path aktif

    const cartUrl = isLoggedIn ? '/cart' : '/login';
    const profileUrl = isLoggedIn ? '/profile' : '/login';
    // Jika belum login → arahkan ke login

    return (
        <nav className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Furni<span>.</span></Link>

                {/* Tombol responsive */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarsFurni">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsFurni">
                    <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
                        {/* Link menu */}
                        <li className={`nav-item ${pathname === '/' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className={`nav-item ${pathname === '/shop' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/shop">Belanja</Link>
                        </li>
                        <li className={`nav-item ${pathname === '/services' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/services">Layanan</Link>
                        </li>
                    </ul>

                    {/* CTA (Cart, Profile, Logout) */}
                    <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
                        <li className="margin-right">
                            <Link className="nav-link" to={cartUrl}>
                                <img src="/images/cart.svg" alt="Cart" />
                            </Link>
                        </li>
                        <li className="margin-right">
                            <Link className="nav-link" to={profileUrl}>
                                <img src="/images/user.svg" alt="User" />
                            </Link>
                        </li>

                        {/* Logout muncul jika sudah login */}
                        {isLoggedIn &&
                            <li>
                                <Link className="nav-link" to="#">
                                    <img src="/images/sign-out.svg" alt="User" />
                                </Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;


Analogi Laravel

isLoggedIn → mirip Auth::check() untuk menampilkan tombol logout.

cartUrl/profileUrl → mirip middleware auth di Laravel.