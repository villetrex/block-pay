export * from 'src/graphql/operations/users';

/*
SAMPLE QUERY-SUBSCRIPTION USAGE ** TO BE DELETED AFTER IMPLEMENTATION
https://www.apollographql.com/docs/react/data/subscriptions
const COMMENTS_QUERY = gql`
  query CommentsForPost($postID: ID!) {
    post(postID: $postID) {
      comments {
        id
        content
      }
    }
  }
`;

function CommentsPageWithData({ params }) {
  const result = useQuery(
    COMMENTS_QUERY,
    { variables: { postID: params.postID } }
  );
  return <CommentsPage {...result} />;
}

const COMMENTS_SUBSCRIPTION = gql`
  subscription OnCommentAdded($postID: ID!) {
    commentAdded(postID: $postID) {
      id
      content
    }
  }
`;

function CommentsPageWithData({ params }) {
    const { subscribeToMore, ...result } = useQuery(
      COMMENTS_QUERY,
      { variables: { postID: params.postID } }
    );

    return (
      <CommentsPage
        {...result}
        subscribeToNewComments={() =>
          subscribeToMore({
            document: COMMENTS_SUBSCRIPTION,
            variables: { postID: params.postID },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newFeedItem = subscriptionData.data.commentAdded;

              return Object.assign({}, prev, {
                post: {
                  comments: [newFeedItem, ...prev.post.comments]
                }
              });
            }
          })
        }
      />
    );
  }


  export function CommentsPage({subscribeToNewComments}) {
  useEffect(() => subscribeToNewComments(), []);
  return <>...</>
}
  */
