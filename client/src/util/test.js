import useLockWatcher from "@MyHooks/useLockWatcher";

function InchvorComponent() {
  let someState = 1;
  let [whenSendLockMessage, whenSendUnLockMessage] = useLockWatcher({
    lockOwner: userId,
    topicName: "apple",
    onReceivedLockMessage: () => {},
    onReceivedUnLockMessage: () => {},
  });

  whenSendLockMessage(() => {
    return someState > 1;
  });

  whenSendUnLockMessage(() => {
    return someState < 10;
  });

  return <div></div>;
}
