import React from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
//galio
import { Block, Text, theme } from "galio-framework";
//argon
import { argonTheme } from "../constants";
import { Icon, Input, Select, Button, Switch } from "../components";
import { postPerson } from "../redux/ActionCreators";
import { connect } from "react-redux";

// dispatches actions from the ones imported.
// these have been thunked to make synchronous calls
// allows us to use these from PROPS
const mapDispatchToProps = {
  postPerson,
};

const { width } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;
const categories = [
  {
    title: "Music Album",
    description:
      "Rock music is a genre of popular music. It developed during and after the 1960s in the United Kingdom.",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?fit=crop&w=840&q=80",
    price: "$125",
  },
  {
    title: "Events",
    description:
      "Rock music is a genre of popular music. It developed during and after the 1960s in the United Kingdom.",
    image:
      "https://images.unsplash.com/photo-1543747579-795b9c2c3ada?fit=crop&w=840&q=80",
    price: "$35",
  },
];

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      company: "",
      yoe: 1,
      reactSkill: false,
      reactNativeSkill: false,
      pictureUri: "",
    };
  }

  onButtonPress = () => {
    this.props.postPerson(this.state);
  };

  onSkillReactChange = () => {
    console.log("toggled react skill");
    this.setState({ reactSkill: !this.state.reactSkill });
  };

  onSkillReactNativeChange = () => {
    console.log("toggled react native skill");
    this.setState({ reactNativeSkill: !this.state.reactNativeSkill });
  };

  onYOEChange = (index, value) => {
    console.log("update YOE to " + value);
    this.setState({ yoe: value });
  };

  onNameTextChange = (text) => {
    console.log("update name to " + text);
    this.setState({ name: text });
  };

  onCompanyTextChange = (text) => {
    console.log("update company to " + text);
    this.setState({ company: text });
  };
  render() {
    return (
      <Block flex center>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              onChangeText={(text) => this.onNameTextChange(text)}
              style={{ marginTop: 10 }}
              left
              placeholder="Full Name"
              iconContent={
                <Icon
                  size={11}
                  color={argonTheme.COLORS.ICON}
                  name="search-zoom-in"
                  family="ArgonExtra"
                  style={{ marginRight: 10 }}
                />
              }
            />
            <Input
              onChangeText={(text) => this.onCompanyTextChange(text)}
              style={{ marginTop: 10 }}
              left
              placeholder="Company"
              iconContent={
                <Icon
                  size={11}
                  color={argonTheme.COLORS.ICON}
                  name="search-zoom-in"
                  family="ArgonExtra"
                  style={{ marginRight: 10 }}
                />
              }
            />
            <Block row space="evenly" style={{ marginTop: 10 }}>
              <Block flex left style={{ marginTop: 10 }}>
                <Text center>YOE: </Text>
              </Block>
              <Block flex center>
                <Select
                  onSelect={(index, value) => this.onYOEChange(index, value)}
                  defaultIndex={this.state.yoe}
                  options={[
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                  ]}
                />
              </Block>
            </Block>
            <Block row space="evenly" style={{ marginTop: 20 }}>
              <Block flex left style={{ marginTop: 10 }}>
                <Text center>React Skill? </Text>
              </Block>
              <Block flex center>
                <Switch
                  value={this.state.reactSkill}
                  onValueChange={this.onSkillReactChange}
                />
              </Block>
            </Block>
            <Block row space="evenly" style={{ marginTop: 20 }}>
              <Block flex left style={{ marginTop: 10 }}>
                <Text center>React-Native Skill? </Text>
              </Block>
              <Block flex center>
                <Switch
                  value={this.state.reactNativeSkill}
                  onValueChange={this.onSkillReactNativeChange}
                />
              </Block>
            </Block>
          </Block>
          <Button
            color="default"
            style={styles.button}
            onPress={this.onButtonPress}
          >
            Sign Me Up!
          </Button>
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
  },
});

export default connect(null, mapDispatchToProps)(SignUp);
