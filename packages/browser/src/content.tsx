import { App } from "@agreeto/app";
import { ReactElement, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { onMessage } from "webext-bridge";
import browser from "webextension-polyfill";

onMessage("action", () => {
  toggleModal();
});

const observer = new MutationObserver(() => {
  const messageWindows = document.querySelectorAll(".btC");

  messageWindows.forEach((messageWindowHotbar) => {
    if (!messageWindowHotbar.querySelector("#agreeto-item")) {
      const sendButton = messageWindowHotbar.childNodes.item(0);

      const container = document.createElement("div");
      container.id = "agreeto-item";
      sendButton?.parentNode?.insertBefore(container, sendButton.nextSibling);

      let root = createRoot(container);
      root.render(<GmailItem />);
    }
  });
});

observer.observe(document.body, { childList: true });

function toggleModal(): void {
  const agreetoContainer = document.getElementById(CONTAINER_ID);
  if (agreetoContainer) {
    // Toggle view
    if (agreetoContainer.hidden) {
      agreetoContainer.hidden = false;
      document.body.style.overflow = "hidden";
    } else {
      agreetoContainer.hidden = true;
      document.body.style.overflow = "auto";
    }
  } else {
    let agreetoContainer = document.createElement("td");
    agreetoContainer.id = CONTAINER_ID;

    document.body.appendChild(agreetoContainer);
    document.body.style.overflow = "hidden";

    let root = createRoot(agreetoContainer);
    root.render(<Modal />);
  }
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === "Escape") {
    window.alert("DONT QUIT");
  }
}

function Modal(): ReactElement {
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          zIndex: "998",
          left: "10%",
          top: "10%",
          width: "80%",
          height: "80%",
          backgroundColor: "white",
        }}
      >
        <App />
      </div>
      <div
        style={{
          position: "fixed",
          zIndex: "997",
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
        onClick={(): void =>
          document.getElementById(CONTAINER_ID)?.setAttribute("hidden", "true")
        }
      ></div>
    </>
  );
}

const CONTAINER_ID = "agreeto-root";

export function GmailItem(): ReactElement {
  return (
    <div style={{ paddingLeft: "12px " }}>
      <button
        title="agreeto-icon-button"
        onClick={toggleModal}
        style={{
          padding: "2px",
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
        }}
      >
        <img
          title="agreeto-logo"
          src={browser.runtime.getURL("item-icon.svg")}
          style={{ width: "28px", height: "28px" }}
        />
      </button>
    </div>
  );
}
