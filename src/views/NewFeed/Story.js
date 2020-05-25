export default class Story extends React.Component {
    render() {
        var story = this.props.story;
        return (
            <View>
                <Image uri={story.author.profilePicture.uri} />
                <Text>{story.author.name}</Text>
                <Text>{story.text}</Text>
            </View>
        );
    }
}