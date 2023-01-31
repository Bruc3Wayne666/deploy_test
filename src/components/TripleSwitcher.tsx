import React from "react";
import PropTypes from "prop-types";


const valueType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
]);

const propTypes = {
    labels: PropTypes.shape({
        left: {
            // @ts-ignore
            title: PropTypes.string.isRequired,
            value: valueType
        },
        center: {
            // @ts-ignore
            title: PropTypes.string.isRequired,
            value: valueType
        },
        right: {
            // @ts-ignore
            title: PropTypes.string.isRequired,
            value: valueType
        }
    }),
    onChange: PropTypes.func.isRequired,
    styles: PropTypes.object
};

const defaultProps = {
    labels: {
        left: {
            title: "left",
            value: "left"
        },
        center: {
            title: "center",
            value: "center"
        },
        right: {
            title: "right",
            value: "right"
        }
    },
    // @ts-ignore
    onChange: (value) => console.log("value:", value)
};

class TripleToggleSwitch extends React.Component {
    // @ts-ignore
    constructor(props) {
        super(props);
        this.state = {
            switchPosition: "left",
            animation: null
        };
    }
    // @ts-ignore
    getSwitchAnimation = (value) => {
        // @ts-ignore
        const { switchPosition } = this.state;
        let animation = null;
        if (value === "center" && switchPosition === "left") {
            animation = "left-to-center";
        } else if (value === "right" && switchPosition === "center") {
            animation = "center-to-right";
        } else if (value === "center" && switchPosition === "right") {
            animation = "right-to-center";
        } else if (value === "left" && switchPosition === "center") {
            animation = "center-to-left";
        } else if (value === "right" && switchPosition === "left") {
            animation = "left-to-right";
        } else if (value === "left" && switchPosition === "right") {
            animation = "right-to-left";
        }
        // @ts-ignore
        this.props.onChange(value);
        this.setState({ switchPosition: value, animation });
    };

    render() {
        // @ts-ignore
        const { labels } = this.props;

        return (
            <div className="main-container">
                <div
                    className={
                    // @ts-ignore
                        `switch ${this.state.animation} ${this.state.switchPosition}-position`
                }
                ></div>
                <input
                    defaultChecked
                    onChange={(e) => this.getSwitchAnimation(e.target.value)}
                    name="map-switch"
                    id="left"
                    type="radio"
                    value="left"
                />
                <label
                    className={`left-label ${
                        // @ts-ignore
                        this.state.switchPosition === "left" && "black-font"
                    }`}
                    htmlFor="left"
                >
                    <h4>{labels.left.title}</h4>
                </label>

                <input
                    onChange={(e) => this.getSwitchAnimation(e.target.value)}
                    name="map-switch"
                    id="center"
                    type="radio"
                    value="center"
                />
                <label
                    className={`center-label ${
                        // @ts-ignore
                        this.state.switchPosition === "center" && "black-font"
                    }`}
                    htmlFor="center"
                >
                    <h4>{labels.center.title}</h4>
                </label>

                <input
                    onChange={(e) => this.getSwitchAnimation(e.target.value)}
                    name="map-switch"
                    id="right"
                    type="radio"
                    value="right"
                />
                <label
                    className={`right-label ${
                        // @ts-ignore
                        this.state.switchPosition === "right" && "black-font"
                    }`}
                    htmlFor="right"
                >
                    <h4>{labels.right.title}</h4>
                </label>
            </div>
        );
    }
}

// @ts-ignore
TripleToggleSwitch.propTypes = propTypes;
// @ts-ignore
TripleToggleSwitch.defaultProps = defaultProps;

export default TripleToggleSwitch;
