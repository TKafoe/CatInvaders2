function rectangleOverlap(r1, l1, r2, l2) {
  if (r1.x < l2.x || r2.x < l1.x) {
    return false;
  }

  if (l1.y > r2.y || r1.y < l2.y) {
    return false;
  }

  return true;
}
