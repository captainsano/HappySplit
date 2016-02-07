import R from 'ramda';
import Parse from 'parse/react-native';

//
// Parse Objects
//
const Friend = Parse.Object.extend('Friend');

//
// Parse Object formatters
//
const userFormatter = function userFormatter(parseUserObject) {
  return {
    id: parseUserObject.id,
    name: parseUserObject.attributes.name,
    email: parseUserObject.attributes.username,
  };
};

//
// Query methods
//
export function getFriendsList(currentUserId) {
  return Parse.Query.or(
    (new Parse.Query(Friend)).equalTo('left', currentUserId),
    (new Parse.Query(Friend)).equalTo('right', currentUserId)
    )
    .find()
    .then((friends) => {
      const friendIds = R.compose(
        R.uniq,
        R.reject(R.equals(currentUserId)),
        R.flatten,
        R.map((f) => [f.attributes.left, f.attributes.right])
      )(friends);

      return new Parse.Query(Parse.User)
        .containedIn('objectId', friendIds)
        .find()
        .then((f) => R.map(userFormatter)(f));
    });
}

// Return list of non-friends
export function getNonFriendsList(currentUserId) {
  return Parse.Query.or(
    (new Parse.Query(Friend)).equalTo('left', currentUserId),
    (new Parse.Query(Friend)).equalTo('right', currentUserId)
    )
    .find()
    .then((friends) => {
      return new Parse.Query(Parse.User)
        .notEqualTo('objectId', currentUserId)
        .notContainedIn('objectId', R.map(R.path(['attributes', 'left']))(friends))
        .notContainedIn('objectId', R.map(R.path(['attributes', 'right']))(friends))
        .find()
        .then((nonFriends) => R.map(userFormatter)(nonFriends))
    });
}

// Add user as friend
export function addFriend(currentUserId, friendUserId) {
  const friend = new Friend();
  friend.set('left', currentUserId);
  friend.set('right', friendUserId);
  return new Promise((resolve, reject) => {
    friend.save({
      success: () => resolve(friendUserId),
      error: () => reject(friendUserId),
    });
  });
}

export function getPaymentsList(currentUserId) {

}

export function getBillsList(currentUserId) {

}

