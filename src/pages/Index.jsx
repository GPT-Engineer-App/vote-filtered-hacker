import { useEffect, useState } from "react";
import { Container, VStack, Input, useColorMode, Button, Box } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import StoryCard from "../components/StoryCard";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const fetchTopStories = async () => {
      const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
      const storyIds = await response.json();
      const top5StoryIds = storyIds.slice(0, 5);

      const storyPromises = top5StoryIds.map(async (id) => {
        const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        return storyResponse.json();
      });

      const stories = await Promise.all(storyPromises);
      setStories(stories);
      setFilteredStories(stories);
    };

    fetchTopStories();
  }, []);

  useEffect(() => {
    const filtered = stories.filter((story) =>
      story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStories(filtered);
  }, [searchTerm, stories]);

  return (
    <Container centerContent maxW="container.md" p={4}>
      <VStack spacing={4} width="100%">
        <Box display="flex" justifyContent="space-between" width="100%">
          <Input
            placeholder="Search stories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={toggleColorMode} ml={2}>
            {colorMode === "light" ? <FaMoon /> : <FaSun />}
          </Button>
        </Box>
        {filteredStories.map((story) => (
          <StoryCard key={story.id} title={story.title} url={story.url} score={story.score} />
        ))}
      </VStack>
    </Container>
  );
};

export default Index;