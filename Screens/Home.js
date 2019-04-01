import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator
} from "react-native";
import Timer from "../Components/Timer";
import Ionicon from "react-native-vector-icons/Ionicons";
import moment from "moment";

const { width, height } = Dimensions.get("window");

export default class Home extends Component {
  state = {
    isEventLoading: true,
    eventData: null,
    isEventError: false,
    isFeedLoading: true,
    feedData: null,
    isFeedError: false,
    showBanner: false,
    spinner: null
  };

  componentDidMount() {
    this.getEvent();
    this.getFeed();
  }

  getEvent = async () => {
    try {
      const eventResp = await fetch("https://app.onefc.com/api/v4/event");
      const event = await eventResp.json();
      this.setState({ isEventLoading: false, eventData: event.data });
    } catch (error) {
      this.setState({ isEventError: true, isEventLoading: false });
    }
  };

  getFeed = async () => {
    try {
      const feedResp = await fetch("https://app.onefc.com/api/v4/lpfeed");
      const feed = await feedResp.json();
      this.setState({ isFeedLoading: false, feedData: feed.data });
    } catch (error) {
      this.setState({ isFeedLoading: false, isFeedError: true });
    }
  };

  listHeaderComponent = () => {
    if (!this.state.isEventLoading && !this.state.isEventError) {
      return (
        <View style={{ backgroundColor: "#000" }}>
          <Image
            style={{
              width,
              height: height / 4
            }}
            loadingIndicatorSource={require("../assets/spinner.png")}
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
      );
    }
    return null;
  };

  _renderItem = ({ item }) => {
    if (item.type === "YOUTUBE") {
      return (
        <View
          style={{
            backgroundColor: "#fff",
            marginVertical: width / 100,
            padding: width / 50,
            marginHorizontal: width / 50
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
            loadingIndicatorSource={require("../assets/spinner.png")}
            source={{ uri: item.data.featured_image.url }}
            style={{
              width: "100%",
              height: height / 5
            }}
            resizeMethod={"auto"}
            resizeMode={"cover"}
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
      );
    }
    return (
      <View
        style={{
          backgroundColor: "#fff",
          marginVertical: width / 100,
          padding: width / 50,
          marginHorizontal: width / 50
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingBottom: 5
          }}
        >
          <Image
            loadingIndicatorSource={require("../assets/spinner.png")}
            source={{ uri: item.data.featured_image.url }}
            style={{ width: "40%", height: width / 4.2 }}
            resizeMethod={"auto"}
            resizeMode={"cover"}
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
    );
  };

  handleScroll = event => {
    if (event.nativeEvent.contentOffset.y > height / 18 + height / 4) {
      this.setState((state, props) => {
        return { showBanner: true };
      });
    }
    if (event.nativeEvent.contentOffset.y < height / 18 + height / 4) {
      this.setState((state, props) => {
        return { showBanner: false };
      });
    }
  };

  render() {
    if (this.state.isEventLoading || this.state.isFeedLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator animating size={"large"} />
        </View>
      );
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
        <FlatList
          ListHeaderComponent={this.listHeaderComponent}
          style={{ backgroundColor: "#c0c0c0" }}
          data={this.state.feedData}
          extraData={{
            feedData: this.state.feedData,
            eventData: this.state.eventData
          }}
          renderItem={this._renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          initialNumToRender={8}
          maxToRenderPerBatch={2}
          scrollEventThrottle={1}
          onScroll={this.handleScroll}
        />
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
    );
  }
}
