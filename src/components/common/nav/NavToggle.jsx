import PropType from 'prop-types';

const NavToggle = ({ children }) => {
  const onClickToggle = () => {
    if (document.body.classList.contains('is-nav-open')) {
      document.body.classList.remove('is-nav-open');
    } else {
      document.body.classList.add('is-nav-open');
    }
  };

  document.addEventListener('click', (e) => {
    const closest = e.target.closest('.navbasket');
    const toggle = e.target.closest('.basket-toggle');
    const closeToggle = e.target.closest('.nav-item-remove');

    if (!closest && document.body.classList.contains('is-nav-open') && !toggle) {
      document.body.classList.remove('is-nav-open');
    }
  });

  return children({ onClickToggle });
};

NavToggle.propTypes = {
  children: PropType.oneOfType([
    PropType.arrayOf(PropType.node),
    PropType.func,
    PropType.node
  ]).isRequired
};

export default NavToggle;
