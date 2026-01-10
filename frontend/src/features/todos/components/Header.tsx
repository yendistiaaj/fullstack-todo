import AppLogo from "../../../assets/app-logo.png";
import Avatar from "../../../assets/avatar-default.png";

function Header() {
  return (
    <nav>
      <ul>
        <li>
          <img src={AppLogo} alt="App Logo" />
          My Todo List
        </li>
        <li>
          <img src={Avatar} alt="User Profile Picture" />
        </li>
      </ul>
    </nav>
  );
}

export default Header;
