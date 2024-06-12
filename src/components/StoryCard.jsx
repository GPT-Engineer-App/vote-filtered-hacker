import { Box, Link, Text, Badge } from "@chakra-ui/react";

const StoryCard = ({ title, url, score }) => (
  <Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden" mb={4}>
    <Link href={url} isExternal fontSize="xl" fontWeight="bold">
      {title}
    </Link>
    <Text mt={2}>
      <Badge colorScheme="green" mr={2}>
        {score}
      </Badge>
      upvotes
    </Text>
  </Box>
);

export default StoryCard;