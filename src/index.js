export const routerStore = {
  history: null,
  location: null
};

export const syncHistory = (history) => {
  // Initialise store
  routerStore.history = history;

  // Handle update from history object
  const handleLocationChange = (location) => {
    routerStore.location = location;
  };

  const unsubscribeFromHistory = history.listen(handleLocationChange);
  handleLocationChange(history.location);

  const subscribe = (listener) => {
    listener(routerStore.location, history.action);
  };

  history.subscribe = subscribe;
  history.unsubscribe = unsubscribeFromHistory;

  return history;
}
