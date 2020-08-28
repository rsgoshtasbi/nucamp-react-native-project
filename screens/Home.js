import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Modal,
  SafeAreaView,
  FlatList,
  Text,
} from "react-native";
import { ListItem } from "react-native-elements";
// import { Text } from "../components";
import { Block, Button, theme } from "galio-framework";
import { fetchPeople } from "../redux/ActionCreators";
import { connect } from "react-redux";
import { Switch } from "../components";

const { width } = Dimensions.get("screen");

// dispatches actions from the ones imported.
// these have been thunked to make synchronous calls
// allows us to use these from PROPS
const mapDispatchToProps = {
  fetchPeople,
};

const mapStateToProps = (state) => {
  return {
    people: state.people,
  };
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      reactSkill: false,
      reactNativeSkill: false,
      PEOPLE: this.props.people.people,
    };
  }

  applyFilters() {
    let filteredPeople = this.state.PEOPLE.filter((person) => {
      return (
        person.reactSkill == this.state.reactSkill &&
        person.reactNativeSkill == this.state.reactNativeSkill
      );
    });
    this.setState({ PEOPLE: filteredPeople }, () => {
      console.log("filtered", filteredPeople);
      console.log("state", this.state.PEOPLE);
    });
  }

  componentDidMount() {
    this.props.fetchPeople();
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  resetForm() {
    this.setState({
      showModal: false,
      reactSkill: false,
      reactNativeSkill: false,
    });
  }

  onReactSkillChange = () => {
    this.setState({ reactSkill: !this.state.reactSkill });
  };

  onReactNativeSkillChange = () => {
    console.log("heres");
    this.setState({ reactNativeSkill: !this.state.reactNativeSkill });
  };

  render() {
    const FilterMenuModal = () => {
      return (
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.modal}>
              <Block row space="evenly" style={{ marginTop: 20 }}>
                <Block flex left style={{ marginLeft: 10 }}>
                  <Text center>React Skill</Text>
                </Block>
                <Block flex center>
                  <Switch
                    value={this.state.reactSkill}
                    onValueChange={this.onReactSkillChange}
                  />
                </Block>
              </Block>
              <Block row space="evenly" style={{ marginTop: 20 }}>
                <Block flex left style={{ marginLeft: 10 }}>
                  <Text center>React Native Skill</Text>
                </Block>
                <Block flex center>
                  <Switch
                    value={this.state.reactNativeSkill}
                    onValueChange={this.onReactNativeSkillChange}
                  />
                </Block>
              </Block>

              <View>
                <Button
                  round
                  title="Apply"
                  onPress={() => {
                    this.applyFilters();
                    this.resetForm();
                  }}
                  style={{ marginTop: 20 }}
                >
                  <Text>Apply</Text>
                </Button>
              </View>
              <View>
                <Button
                  round
                  onPress={() => {
                    this.toggleModal();
                    this.resetForm();
                  }}
                  color="error"
                  title="Cancel"
                  style={{ marginTop: 20 }}
                >
                  <Text>Cancel</Text>
                </Button>
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      );
    };

    const renderPeopleList = ({ item }) => {
      console.log("fixed");
      console.log(item);
      return (
        <ListItem
          title={item.name}
          titleStyle={{ marginBottom: 5 }}
          subtitle={
            <View style={styles.subtitleView}>
              <Text style={{ fontSize: 12 }}>
                Company: {item.company}
                {"\n"}
                React Skills: {item.reactSkill ? "Yes" : "No"}
                {"\n"}
                React Native Skills: {item.reactNativeSkill ? "Yes" : "No"}
                {"\n"}
                Years of Experience: {item.yoe}
              </Text>
            </View>
          }
          leftAvatar={{
            source: {
              uri: item.pictureUri,
            },
          }}
          bottomDivider
        />
      );
    };

    return (
      <Block flex center style={styles.home}>
        {/* Main Home Page List */}
        <FlatList
          style={styles.listItem}
          data={this.state.PEOPLE}
          renderItem={renderPeopleList}
          keyExtractor={(item) => item.id.toString()}
        />
        {/* Filter Menu Logic */}
        <Button
          round
          icon
          style={{ position: "absolute", bottom: 20 }}
          onPress={() => {
            this.toggleModal();
          }}
        >
          <Text color="white">Filters</Text>
        </Button>
        <FilterMenuModal />
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  listItem: {
    alignSelf: "stretch",
    textAlign: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
