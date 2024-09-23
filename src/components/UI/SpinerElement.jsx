import classes from "./SpinerElement.module.css";

export default function SpinerElement() {
  return (
    <dialog open className={classes.SpinerElement}>
      <div className={classes.centered}>
        <div className={classes["blob-1"]}></div>
        <div className={classes["blob-2"]}></div>
      </div>
    </dialog>
  );
}
