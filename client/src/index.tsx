import { Counter } from "components/Counter";
import { StrictMode } from "react";
import { render } from "react-dom";

render(
  <StrictMode>
    <Counter giftId="5655" color="#f00" description="За обаму" />
    <Counter giftId="5269" color="#00f" description="За трампа" />
  </StrictMode>,
  document.getElementById('root')
);
