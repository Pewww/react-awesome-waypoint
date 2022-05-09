# react-awesome-waypoint

Componentized [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) in React.

## Demo

### [Link](https://codesandbox.io/s/react-awesome-waypoint-xlcmy1?file=/src/components/Cards.tsx)

<div align="center">
  <img src="https://user-images.githubusercontent.com/23455736/167337342-2cd2f2bc-2f67-4430-afd8-91ef45a4b641.gif" width="500">
</div>

## Installation

#### yarn

```
yarn add react-awesome-waypoint
```

#### npm

```
npm install react-awesome-waypoint
```

## API

| Paramters 	| Default | Description 	| Required 	| 
  |------------	| ---------	|----------	| --------- 	|
  | children: `string` 	| `undefined` 	| The actual target to be rendered. If you don't pass 'children' props, then an empty 'span' element will be rendered instead. 	| X 	| 
  | onEnter: `() => void` 	| `undefined` 	| Callback executed when entered(exposed) on a viewport. 	| X 	|
  | onLeave: `() => void` 	| `undefined`	| Callback executed when leaved on a viewport. 	| X 	|
  | root: `Element | Document | null | undefined` 	| `null` 	| Specifies the element object (root element) to be used instead of the viewport to check the visibility of the target. If not specified or `null`, the browser's viewport is used by default.	| X 	|
  | threshold: `number | number[] | undefined` 	| `[0]` 	| The percentage of how much visibility of the target is required for the observer to run. When set to `0` or `[0]`, the observer runs as soon as the edge pixel of the target crosses the root range.  	| X 	|
  | topOffset: `string` 	| `'0px'` 	| Use the outer `top margin` to expand or contract the Root range. 	| X 	|
  | bottomOffset: `string` 	| `'0px'` 	| Use the outer `bottom margin` to expand or contract the Root range. 	| X 	|
  | leftOffset: `string` 	| `'0px'` 	| Use the outer `left margin` to expand or contract the Root range. 	| X 	|
  | rightOffset: `string` 	| `'0px'` 	| Use the outer `right margin` to expand or contract the Root range. 	| X 	|

## Usage

> 📢 Recommend to check the Demo.

```tsx
import { useState } from 'react';
import styled from 'styled-components';
import Waypoint from 'react-awesome-waypoint';

import { getCards } from '../apis/fetch';
import type { Card } from '../apis/fetch';

import CardComp from './Card';

const Cards = () => {
  const [data, setData] = useState<Card[]>([]);

  const handleFetch = async () => {
    const res = await getCards();

    setData(curr => ([
      ...curr,
      ...res
    ]));
  };

  return (
    <Wrapper>
      {data.map(({ id, title, description }, index) => (
        <CardComp
          key={id}
          title={`${title}-${index}`}
          description={description}
        />
      ))}
      <Waypoint onEnter={handleFetch}>
        <div>Loading...</div>
      </Waypoint>
    </Wrapper>
  );
};

export default Cards;

const Wrapper = styled.ul``;
```

## FAQ

### 1. What is the difference between `threshold` and `offset`?

'threshold' refers to how much visibility of the target is needed to trigger observer, as explained by the API.<br>
If you set it to `0.3`, the observer will be executed when 30% of the target is entered to the viewport.

![threshold example](https://user-images.githubusercontent.com/23455736/167333516-20cf8f60-248e-4a0f-bb5d-f7935475a8ed.png)

> Source: https://heropy.blog/2019/10/27/intersection-observer/

'offset' is same as the `rootMargin` of the Intersection Observer API.<br>
For example, if the `bottomOffset` is given a value of more than zero, the observer will run before the target wrapped in `Waypoint` is entered to the viewport when scrolling.

![offset example](https://user-images.githubusercontent.com/23455736/167334337-f5c79753-428e-4a86-bea4-eb5bc11e8d56.png)

> Source: https://heropy.blog/2019/10/27/intersection-observer/


### 2. Does it support all features of the Intersection Observer API?

No, it's not. Onlt the features(props) that I think are most useful are added first. <br>
If you lack or need any features, please create an issue or post a PR.

### 3. What should I do if I want to pass components instead of HTML elements?

Please wrap your component with `React.forwardRef()` like this.

```tsx
import React, { useState } from 'react';
import Waypoint from 'react-awesome-waypoint';

const Loading = React.forwardRef((_, ref) => (
  <div ref={ref as React.LegacyRef<HTMLDivElement>}>
    Loading...
  </div>
));

const Comp = () => {
  return (
    <Waypoint onEnter={() => {}}>
      <Loading />
    </Waypoint>
  );
};

export default Comp;
```
