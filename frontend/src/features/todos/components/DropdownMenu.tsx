type Props = {
  showMenu: boolean;
  onLogoutSuccess: () => void;
};

function DropdownMenu({ showMenu, onLogoutSuccess }: Props) {
  if (!showMenu) return null;

  return (
    <div className="dropdown-menu">
      <ul>
        <li className="dropdown-item">
          <button
            type="button"
            className="dropdown-link"
            onClick={onLogoutSuccess}
          >
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
}

export default DropdownMenu;
