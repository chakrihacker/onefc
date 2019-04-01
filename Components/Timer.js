import React, { Component, Fragment } from "react"
import { Text, View } from "react-native"

export default class Timer extends Component {
  static defaultProps = {
    fontSize: 24
  }

  state = {
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00"
  }

  componentDidMount() {
    this.startCountDown()
  }

  startCountDown = () => {
    this.countDown = setInterval(() => {
      let now = new Date().getTime()
      let countDownDate = new Date(this.props.startTime).getTime()
      let distance = countDownDate - now
      let days = Math.floor(distance / (1000 * 60 * 60 * 24))
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      let seconds = Math.floor((distance % (1000 * 60)) / 1000)
      this.setState({
        days,
        hours,
        minutes,
        seconds
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.countDown)
  }

  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <View style={{ alignItems: "center", paddingHorizontal: 5 }}>
          <Text
            style={{
              color: "#fff",
              fontSize: this.props.fontSize,
              fontWeight: "bold"
            }}
          >
            {this.state.days <= 0
              ? "00"
              : this.state.days > 9
              ? this.state.days
              : `0${this.state.days}`}
          </Text>
          <Text style={{ color: "#fff", fontSize: this.props.fontSize - 4 }}>
            DAYS
          </Text>
        </View>
        <View style={{ alignItems: "center", paddingHorizontal: 5 }}>
          <Text
            style={{
              color: "#fff",
              fontSize: this.props.fontSize,
              fontWeight: "bold"
            }}
          >
            {this.state.hours <= 0
              ? "00"
              : this.state.hours > 9
              ? this.state.hours
              : `0${this.state.hours}`}
          </Text>
          <Text style={{ color: "#fff", fontSize: this.props.fontSize - 4 }}>
            HRS
          </Text>
        </View>
        <View style={{ alignItems: "center", paddingHorizontal: 5 }}>
          <Text
            style={{
              color: "#fff",
              fontSize: this.props.fontSize,
              fontWeight: "bold"
            }}
          >
            {this.state.minutes <= 0
              ? "00"
              : this.state.minutes > 9
              ? this.state.minutes
              : `0${this.state.minutes}`}
          </Text>
          <Text style={{ color: "#fff", fontSize: this.props.fontSize - 4 }}>
            MINS
          </Text>
        </View>
        <View style={{ alignItems: "center", paddingHorizontal: 5 }}>
          <Text
            style={{
              color: "#fff",
              fontSize: this.props.fontSize,
              fontWeight: "bold"
            }}
          >
            {this.state.seconds <= 0
              ? "00"
              : this.state.seconds > 9
              ? this.state.seconds
              : `0${this.state.seconds}`}
          </Text>
          <Text style={{ color: "#fff", fontSize: this.props.fontSize - 4 }}>
            SECS
          </Text>
        </View>
      </View>
    )
  }
}
