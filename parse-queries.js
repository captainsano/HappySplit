import R from 'ramda';
import Parse from 'parse/react-native';

//
// Parse Objects
//
const Friend = Parse.Object.extend('Friend');
const Payment = Parse.Object.extend('Payment');
const Bill = Parse.Object.extend('Bill');

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

const paymentFormatter = function paymentFormatter(parsePaymentObject) {
  return {
    id: parsePaymentObject.id,
    description: 'payment',
    amount: parsePaymentObject.attributes.amount,
    from: parsePaymentObject.attributes.from,
    to: parsePaymentObject.attributes.to,
  };
};

const billFormatter = function billFormatter(parseBillObject) {
  return {
    id: parseBillObject.id,
    description: parseBillObject.attributes.description,
    amount: parseBillObject.attributes.amount,
    paidBy: userFormatter(parseBillObject.attributes.paidBy),
    sharedBy: R.map(userFormatter)(parseBillObject.attributes.sharedBy),
  };
};


//
// Query methods
//
export function getFriendsList(currentUserId) {
  const currentUser = new Parse.User();
  currentUser.id = currentUserId;
  return Parse.Query.or(
    (new Parse.Query(Friend)).equalTo('left', currentUser),
    (new Parse.Query(Friend)).equalTo('right', currentUser)
    )
    .include('left')
    .include('right')
    .find()
    .then((friends) => (
      R.compose(
        R.map(userFormatter),
        R.reject(R.propEq('id', currentUserId)),
        R.flatten,
        R.map((f) => [f.attributes.left, f.attributes.right])
      )(friends)
    ));
}

// Return list of non-friends
export function getNonFriendsList(currentUserId) {
  const currentUser = new Parse.User();
  currentUser.id = currentUserId;
  return getFriendsList(currentUserId)
    .then((friendsList) => (
      new Parse.Query(Parse.User)
        .notContainedIn('objectId', [currentUserId].concat(R.map(R.prop('id'))(friendsList)))
        .find()
        .then(R.map(userFormatter))
    ));
}

// Add user as friend
export function addFriend(currentUserId, friendUserId) {
  const friend = new Friend();
  const leftUser = new Parse.User();
  leftUser.id = currentUserId;
  const rightUser = new Parse.User();
  rightUser.id = friendUserId;
  friend.set('left', leftUser);
  friend.set('right', rightUser);
  return new Promise((resolve, reject) => {
    friend.save({
      success: () => resolve(friendUserId),
      error: () => reject(friendUserId),
    });
  });
}

export function getPaymentsList(currentUserId) {
  return Parse.Query.or(
    (new Parse.Query(Payment)).equalTo('from', currentUserId),
    (new Parse.Query(Payment)).equalTo('to', currentUserId)
    )
    .find()
    .then(R.map(paymentFormatter));
}

export function addBill(paidByUserId, sharedByUserIds, amount, description) {
  const bill = new Bill();
  const paidByUser = new Parse.User();
  paidByUser.id = paidByUserId;
  bill.set('paidBy', paidByUser);
  bill.set('sharedBy', R.map((uid) => {
    const u = new Parse.User();
    u.id = uid;
    return u;
  })(sharedByUserIds));
  bill.set('amount', amount);
  bill.set('description', description);

  return new Promise((resolve, reject) => {
    bill.save({
      success: () => resolve(),
      error: () => reject(),
    });
  });
}

export function getBillsList(currentUserId) {
  const currentUser = new Parse.User();
  currentUser.id = currentUserId;
  return Parse.Query.or(
    (new Parse.Query(Bill)).equalTo('paidBy', currentUser),
    (new Parse.Query(Bill)).equalTo('sharedBy', currentUser)
    )
    .include('paidBy')
    .include('sharedBy')
    .find()
    .then((bills) => R.map(billFormatter)(bills));
}
