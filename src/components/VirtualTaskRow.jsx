import { useEffect, useRef, useState } from "react";
import TaskCard from "./TaskCard";

const ROW_HEIGHT = 250;

function VirtualTaskRow({ task, onEdit, onDelete }) {
  const rowRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const row = rowRef.current;

    if (!row) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShouldRender(entry.isIntersecting);
      },
      {
        rootMargin: "500px 0px",
      },
    );
    observer.observe(row);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={rowRef}
      className="virtual-task-row"
      data-task-id={task.id}
      data-rendered={shouldRender}
      style={{ minHeight: ROW_HEIGHT }}
    >
      {shouldRender ? (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ) : null}
    </div>
  );
}

export default VirtualTaskRow;
