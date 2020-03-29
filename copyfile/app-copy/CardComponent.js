import React, { Component } from "react";
import { Text, StyleSheet, Dimensions } from "react-native";
import { Card, CardItem } from "native-base";

class CardCompnent extends Component {
  constructor(props) {
    super(props);

    console.log(this.props);
  }

  render() {
    return (
      <Card>
        <CardItem style={{ height: 50, width: 300 }}>
          <Text>{this.props.title}</Text>
        </CardItem>
        <CardItem style={{ height: 200, width: 300 }}>
          <Text style={{ height: 100 }}>{this.props.body}</Text>
        </CardItem>
      </Card>
    );
  }
}
let width = Dimensions.get("window").width;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  cardInfo: {
    height: 50,
    flexDirection: "row"
  },
  username: {
    fontWeight: "bold",
    height: 60,
    lineHeight: 60,
    flex: 1,
    marginLeft: 8
  },
  image: {
    width: width,
    height: width
  },
  type: {
    fontStyle: "italic",
    fontWeight: "bold"
  }
});

export default CardCompnent;
