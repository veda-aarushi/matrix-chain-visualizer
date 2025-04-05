async function submitDimensions() {
    const input = document.getElementById("dimensions").value.trim();
    const dimensions = input.split(',').map(x => parseInt(x.trim()));
  
    if (dimensions.length < 2 || dimensions.some(isNaN)) {
      alert("Please enter at least two valid numbers separated by commas.");
      return;
    }
  
    try {
      const res = await fetch("http://localhost:3000/api/mcm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dimensions })
      });
  
      const data = await res.json();
  
      if (res.ok) {
        document.getElementById("cost").textContent = `Minimum multiplication cost: ${data.minCost}`;
        document.getElementById("order").textContent = `Optimal Order: ${data.optimalOrder}`;
        drawTree(data.optimalOrder);
      } else {
        alert(data.error || "Server error");
      }
    } catch (err) {
      alert("Failed to connect to the server.");
      console.error(err);
    }
  }
  
  function drawTree(optimalOrder) {
    const svg = document.getElementById("visualCanvas");
    svg.innerHTML = "";
  
    // Step 1: Convert expression to tree
    function parseTree(expr) {
      expr = expr.trim();
      if (!expr.startsWith("(")) return { value: expr, children: [] };
  
      let depth = 0;
      for (let i = 1; i < expr.length - 1; i++) {
        const char = expr[i];
        if (char === "(") depth++;
        else if (char === ")") depth--;
        else if (char === "x" && depth === 0) {
          return {
            value: "×",
            children: [
              parseTree(expr.slice(1, i - 1).trim()),
              parseTree(expr.slice(i + 2, -1).trim())
            ]
          };
        }
      }
      return { value: expr, children: [] };
    }
  
    // Step 2: Compute width of each subtree
    function computeWidths(node) {
      if (node.children.length === 0) {
        node.width = 1;
      } else {
        computeWidths(node.children[0]);
        computeWidths(node.children[1]);
        node.width = node.children[0].width + node.children[1].width;
      }
    }
  
    // Step 3: Assign x/y coordinates based on widths
    function assignPositions(node, xOffset = 0, depth = 0, spacing = 80) {
      const levelHeight = 100;
      node.y = depth * levelHeight + 50;
  
      if (node.children.length === 0) {
        node.x = xOffset + 50;
      } else {
        const left = node.children[0];
        const right = node.children[1];
  
        const leftWidth = left.width * spacing;
        const rightWidth = right.width * spacing;
  
        assignPositions(left, xOffset, depth + 1, spacing);
        assignPositions(right, xOffset + leftWidth, depth + 1, spacing);
  
        node.x = (left.x + right.x) / 2;
      }
    }
  
    // Step 4: Draw tree
    function renderTree(node) {
      if (node.children.length === 2) {
        node.children.forEach(child => {
          const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("x1", node.x);
          line.setAttribute("y1", node.y);
          line.setAttribute("x2", child.x);
          line.setAttribute("y2", child.y);
          line.setAttribute("stroke", "#999");
          line.setAttribute("stroke-width", "2");
          svg.appendChild(line);
  
          renderTree(child);
        });
      }
  
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", node.x);
      circle.setAttribute("cy", node.y);
      circle.setAttribute("r", 20);
      circle.setAttribute("fill", "#4F46E5");
      svg.appendChild(circle);
  
      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", node.x);
      label.setAttribute("y", node.y + 5);
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("font-size", "14");
      label.setAttribute("fill", "white");
      label.textContent = node.value;
      svg.appendChild(label);
    }
  
    const tree = parseTree(optimalOrder);
    computeWidths(tree);
    assignPositions(tree);
    renderTree(tree);
  }
  