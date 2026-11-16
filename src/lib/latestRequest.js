/** Only the latest request may publish, including when a fetch ignores abort. */
export function createLatestRequest() {
  let generation = 0;
  let controller;
  const cancel = () => { generation++; controller?.abort(); };
  return {
    cancel,
    async run(task, onSuccess, onError) {
      cancel();
      const id = generation;
      controller = new AbortController();
      try {
        const result = await task(controller.signal);
        if (id === generation) onSuccess(result);
      } catch (error) {
        if (id === generation && error.name !== 'AbortError') onError(error);
      }
    }
  };
}
