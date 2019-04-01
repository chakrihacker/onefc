import React, { Component } from "react"
import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  ActivityIndicator
} from "react-native"
import Timer from "../Components/Timer"
import Ionicon from "react-native-vector-icons/Ionicons"
import moment from "moment"

const { width, height } = Dimensions.get("window")

export default class Home extends Component {
  state = {
    isEventLoading: true,
    eventData: null,
    isEventError: false,
    isFeedLoading: true,
    feedData: null,
    isFeedError: false,
    showBanner: false
  }

  componentDidMount() {
    this.getEvent()
    this.getFeed()
  }

  getEvent = async () => {
    try {
      const eventResp = await fetch("https://app.onefc.com/api/v4/event")
      const event = await eventResp.json()
      console.log(event)
      this.setState({ isEventLoading: false, eventData: event.data })
    } catch (error) {
      this.setState({ isEventError: true, isEventLoading: false })
    }
  }

  getFeed = async () => {
    try {
      const feedResp = await fetch("https://app.onefc.com/api/v4/lpfeed")
      const feed = await feedResp.json()
      this.setState({ isFeedLoading: false, feedData: feed.data })
    } catch (error) {
      this.setState({ isFeedLoading: false, isFeedError: true })
    }
  }

  handleScroll = event => {
    if (event.nativeEvent.contentOffset.y > 200) {
      this.setState({ showBanner: true })
    }
    if (event.nativeEvent.contentOffset.y < 200) {
      this.setState({ showBanner: false })
    }
  }

  render() {
    if (this.state.isEventLoading || this.state.isFeedLoading) {
      return <ActivityIndicator size={"large"} />
    }
    return (
      <View>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#000",
              padding: width / 40,
              height: height / 18
            }}
          >
            <Ionicon name={"md-menu"} color={"#fff"} size={24} />
            <Text style={{ color: "#fff", fontSize: 24 }}>ONE</Text>
            <Ionicon name={"md-search"} color={"#fff"} size={24} />
          </View>
        </View>

        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={{
            alignItems: "center",
            backgroundColor: "#c0c0c0"
          }}
          onScroll={event => this.handleScroll(event)}
        >
          {!this.state.isEventLoading && !this.state.isEventError && (
            <View style={{ backgroundColor: "#000" }}>
              <Image
                style={{
                  width,
                  height: height / 4
                }}
                source={{
                  uri: this.state.eventData[0].creatives.bannerUpcoming.url
                }}
                resizeMode={"cover"}
              />
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                <Timer
                  startTime={this.state.eventData[0].startTime}
                  fontSize={width / 20}
                />
              </View>
            </View>
          )}
          <FlatList
            nestedScrollEnabled={true}
            contentContainerStyle={{ paddingVertical: 10 }}
            style={{ width: width / 1.1 }}
            data={this.state.feedData}
            extraData={this.state.feedData}
            renderItem={({ item }) => {
              if (item.type === "YOUTUBE") {
                return (
                  <View
                    style={{
                      backgroundColor: "#fff",
                      marginVertical: 3,
                      padding: 5
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold"
                      }}
                    >
                      {item.data.title}
                    </Text>
                    <Image
                      source={{ uri: item.data.featured_image.url }}
                      style={{
                        width: "100%",
                        height: height / 5
                      }}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: 12,
                          paddingVertical: 5,
                          color: "grey"
                        }}
                      >
                        {moment(item.data.published_date).fromNow()}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          numberOfLines={2}
                          ellipsizeMode={"tail"}
                          style={{ width: "95%" }}
                        >
                          {decodeURI(item.data.description)}
                        </Text>
                        <Ionicon name={"md-share"} />
                      </View>
                    </View>
                  </View>
                )
              }
              return (
                <View
                  style={{
                    backgroundColor: "#fff",
                    marginVertical: 3,
                    padding: 5
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      paddingBottom: 5
                    }}
                  >
                    <Image
                      source={{ uri: item.data.featured_image.url }}
                      style={{ width: "40%", height: width / 4.2 }}
                    />
                    <View
                      style={{
                        justifyContent: "space-between",
                        flex: 1,
                        paddingLeft: 5
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold"
                        }}
                      >
                        {item.data.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          paddingVertical: 5,
                          color: "grey"
                        }}
                      >
                        {moment(item.data.published_date).fromNow()}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ width: "96%" }} numberOfLines={2}>
                      {decodeURI(item.data.description)}
                    </Text>
                    <Ionicon name={"md-share"} />
                  </View>
                </View>
              )
            }}
            keyExtractor={item => item.id}
          />
        </ScrollView>
        {this.state.showBanner && (
          <View
            style={{
              position: "absolute",
              backgroundColor: "#000",
              borderTopColor: "yellow",
              borderTopWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              padding: width / 40,
              top: height / 18,
              left: 0,
              right: 0
            }}
          >
            <View>
              <Text style={{ color: "yellow" }}>A NEW ERA</Text>
              <Text style={{ color: "#fff" }}>
                Tokyo, 31st Mar (Sun), 3:30PM
              </Text>
            </View>
            <Timer
              startTime={this.state.eventData[0].startTime}
              fontSize={16}
            />
          </View>
        )}
      </View>
    )
  }
}
