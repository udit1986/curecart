import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

function Card({ onClick, selected, title, itemId }) {

  return (
    <div
      onClick={() => onClick(visibility)}
      style={{
        width: '160px',
      }}
      tabIndex={0}
    >
      <div className="card">
        <div>{title}</div>
        <div>selected: {JSON.stringify(!!selected)}</div>
      </div>
      <div
        style={{
          height: '200px',
        }}
      />
    </div>
  );
}

const MenuItem = ({ text, selected, source, startFrom }) => {
  return <div className={`carousel-card-menu-item ${selected ? "active" : ""}`}>
    <div>
      <a className="carousel-card-menu-item-anchor">
        <div><img title={text} className="carousel-card-menu-item-img"
          src={source}>
        </img></div>
        <div className="item-name">{text}</div>
        {startFrom &&
          <div className="item-price">From $ {startFrom}</div>
        }
      </a>
    </div>

  </div>;
};

const Menu = (list, selected) =>
  list.map(el => {
    const { name } = el;

    return <MenuItem text={name} key={name} selected={selected} source={el.source} startFrom={el.startFrom} />;
  });


function Arrow({
  children,
  disabled,
  onClick,
  className
}) {
  return (
    <div
      style={{
        position: "absolute",
        alignSelf: "center",
        pointerEvents: "auto",
        padding: "40px 15px",
        boxShadow: "1px 2px 10px -1px rgb(0 0 0 / 30%)",
        backgroundColor: "hsla(0,0%,100%,.98)",
        cursor: "pointer",
        borderRadius: "4px 0 0 4px",
        display: disabled ? "none" : "flex",
      }}
      className={className}
      onClick={onClick}>
      {/* <button
      disabled={disabled}
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        right: "1%",
        opacity: disabled ? "0" : "1",
        userSelect: "none",
        borderRadius: "4px 0 0 4px",
        
      }}
    > */}
      {children}
      {/* </button> */}
    </div>
  );
}

function LeftArrow() {
  const {
    isFirstItemVisible,
    scrollPrev,
    visibleElements,
    initComplete
  } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !initComplete || (initComplete && isFirstItemVisible)
  );
  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleElements.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleElements]);

  return (
    <Arrow disabled={disabled} className="left-arrow-nav" onClick={() => scrollPrev()}>
      <svg width="14.6" height="24" viewBox="0 0 16 27" xmlns="http://www.w3.org/2000/svg" className="_1xtBwk"><path d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z" fill="#000"></path></svg>
    </Arrow>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext, visibleElements } = React.useContext(
    VisibilityContext
  );

  // console.log({ isLastItemVisible });
  const [disabled, setDisabled] = React.useState(
    !visibleElements.length && isLastItemVisible
  );
  React.useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleElements]);

  return (
    <Arrow disabled={disabled} className="right-arrow-nav" onClick={() => scrollNext()}>
      <svg width="14.6" height="24" viewBox="0 0 16 27" xmlns="http://www.w3.org/2000/svg" style={{ transform: "rotate(180deg)" }}><path d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z" fill="#000" ></path></svg>
    </Arrow>
  );
}


class CarouselCard extends Component {
  state = {
    alignCenter: true,
    clickWhenDrag: false,
    dragging: true,
    hideArrows: true,
    hideSingleArrow: true,
    itemsCount: this.props.items.length,
    scrollToSelected: false,
    selected: "item1",
    translate: 0,
    transition: 0.3,
    wheel: true
  };

  constructor(props) {
    super(props);
    this.menu = null;
    this.menuItems = Menu(this.props.items.slice(0, this.props.items.length), this.state.selected);
    this.selected = [];
    this.position = 0;

  }

  // onFirstItemVisible = () => {
  //   console.log("first item is visible");
  // };

  // onLastItemVisible = () => {
  //   console.log("last item is visible");

  //   const newItems = Array(5)
  //     .fill(1)
  //     .map((el, ind) => ({ name: `item${list.length + ind + 1}` }));
  //   list = list.concat(newItems);
  //   this.menuItems = Menu(list, list.slice(-1)[0].name);
  //   this.setState({
  //     itemsCount: list.length,
  //     selected: this.state.selected
  //   });
  // };

  onUpdate = ({ translate }) => {
    console.log(`onUpdate: translate: ${translate}`);
    this.setState({ translate });
  };

  onSelect = key => {
    console.log(`onSelect: ${key}`);
    this.setState({ selected: key });
  };

  componentDidUpdate(prevProps, prevState) {
    const { alignCenter } = prevState;
    const { alignCenter: alignCenterNew } = this.state;
    if (alignCenter !== alignCenterNew) {
      this.menu.setInitial();
    }
  }

  setItemsCount = ev => {
    const { itemsCount = this.props.items.length, selected } = this.state;
    const val = +ev.target.value;
    const itemsCountNew =
      !isNaN(val) && val <= this.props.items.length && val >= 0
        ? +ev.target.value
        : this.props.items.length;
    const itemsCountChanged = itemsCount !== itemsCountNew;

    if (itemsCountChanged) {
      this.menuItems = Menu(this.props.items.slice(0, itemsCountNew), selected);
      this.setState({
        itemsCount: itemsCountNew
      });
    }
  };

  setSelected = ev => {
    const { value } = ev.target;
    this.setState({ selected: String(value) });
  };

  render() {
    const {
      alignCenter,
      clickWhenDrag,
      hideArrows,
      dragging,
      hideSingleArrow,
      itemsCount,
      scrollToSelected,
      selected,
      translate,
      transition,
      wheel
    } = this.state;

    const menu = this.menuItems;

    const checkboxStyle = {
      margin: "5px 10px"
    };
    const valueStyle = {
      margin: "5px 10px",
      display: "inline-block"
    };

    return (
      <div className="scroll-menu-container">
        <div className="carousel-card-menu-title-item">
          <div className="item-title"><h2 className="_2cAig-">{this.props.headerTitle}</h2><div className="_30kJiF">
            <a className="_2KpZ6l _3dESVI"
              href="/">
              VIEW ALL</a>
          </div>
          </div>
        </div>;
        {/* <ScrollMenu
          alignCenter={alignCenter}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          clickWhenDrag={clickWhenDrag}
          data={menu}
          dragging={dragging}
          hideArrows={hideArrows}
          hideSingleArrow={hideSingleArrow}
          onFirstItemVisible={this.onFirstItemVisible}
          onLastItemVisible={this.onLastItemVisible}
          onSelect={this.onSelect}
          onUpdate={this.onUpdate}
          ref={el => (this.menu = el)}
          scrollToSelected={scrollToSelected}
          selected={selected}
          transition={+transition}
          translate={translate}
          wheel={wheel}
        /> */}
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} wrapperClassName="scrollContainerWidth">
          {menu}
        </ScrollMenu>
      </div>
    );
  }
}

export default CarouselCard;
