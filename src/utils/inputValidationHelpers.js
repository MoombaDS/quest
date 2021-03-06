import R from 'ramda';

const refineInput = R.curry((attemptType, input) => {
	return input
        .split(' ')
        .slice(attemptType, input.length)
        .reduce((acc, word, i, words) => {
            if (words.length === attemptType) {
                acc += words.shift();
            }
            else {
                acc += !acc ? word : ' ' + word;
            }
            return acc;
        }, '');
});

const findItem = R.curry((list, itemName) => {
	const foundItem = list.find(item => item.name.toUpperCase() === itemName.toUpperCase());
    return foundItem ? foundItem : {name: itemName};
});

// TODO: Rewrite this function somehow. Keep it pure but make it shorter.
const createDispatchable = R.curry((attemptType, attemptTypes, actions, messageGen, item) => {
    if (attemptType === attemptTypes.equip) {
        if (item && item.hasOwnProperty('equippable')) {
            return item.equippable ? (dispatch) => {
                dispatch(actions.equipItem(item));
                dispatch(actions.showMessage(messageGen.getEquipMessage(item), 0));
            } : (dispatch) => {
                dispatch(actions.showMessage(messageGen.getCannotBeEquippedMessage(item), 0));
            };
        } else if (item && item.hasOwnProperty('name') && item.name.length > 0) {
            return (dispatch) => {
                dispatch(actions.showMessage(messageGen.getNoSuchItemMessage(item.name), 0));
            };
        }
    } else if (attemptType === attemptTypes.lookAt) {
        if (item && item.hasOwnProperty('equippable')) {
        	return (dispatch) => {
        		dispatch(actions.showMessage(messageGen.getLookAtItemMessage(item), 0));
        		if (item.equippable) {
        			dispatch(actions.showMessage(messageGen.getItemStatsMessage(item), 0));
        		}
        	};
        } else if (item && item.hasOwnProperty('name') && item.name.length > 0) {
        	return (dispatch) => {
        		dispatch(actions.showMessage(messageGen.getNoSuchItemMessage(item.name), 0));
        	};
        }
    }

    return (dispatch) => {};
});

export const readInputAndCreateDispatchable = (list, attemptTypes, attemptType, actions, messageGen) => {
    return R.compose(
        createDispatchable(attemptType, attemptTypes, actions, messageGen),
        findItem(list),
        refineInput(attemptType)
    );
};
