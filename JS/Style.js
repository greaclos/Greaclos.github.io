// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
// # # # # # # # #     # # #           # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
// # # # # # # # #     # #     # # #     # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
// # # # # # # # #     # #   # # # # #   # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
// # # # # # # # #     # #   # # # # #   # # #   # # # #   # # # #     # # #   # #     # # # # # #     # #
// # # # # # # # #     # #   # # # # #   # # #   # # # #   # # #   # #   # #   #   #     # # # #     # # #
// # # # # # # # #     # #   # # # # #   # # #   # # # #   # #   # # #   # #     # # # # # # #     # # # #
// # # # # # # # #     # #   # # #   #   # # #   # # # #   # #   # #   # # #   # #     # # #     # # # # #
// # # # # # # # #     # #   # # #       # # #   # # # #   # #       # # # #   # # #     #     # # # # # #
// # # # # # # # #     # #   # # # #     # # #   # # # #   # #   # # # # # #   # # # #       # # # # # # #
// # #     # # # #     # #     # # #       # #   # # # #   # #   # # #   # #   # # # #     # # # # # # # #
// # #     # # # #     # # #           #   # #             # # #       # # #   # # #     # # # # # # # # #
// # #     # # # #     # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #     # # # # # # # # # #
// # #       # #       # # # # # # # # # # # # # # # # # # # # # # # # # # # # #     # # # # # # # # # # #
// # # #             # # # # # # # # # # # # # # # # # # # # # # # # # # # # #     # # # # # # # # # # # #
// # # # #         # # # # # #                                                   # # # # # # # # # # # # #
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
// 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
$(`body`).css({
  backgroundColor: "#31c040",
});

var _tema = {
  backColor: "#31c040",
  textColor: "#fff",
  form: {
    backText: "#aaa",
    colorText: "#ddd",
    submit: "bg-primary",
    secondaryBtn: "bg-light",
  },
  navBar: {
    back: "bg-primary",
    text: "navbar-dark",
  },
};

$("input.form-control").css({
  backgroundColor: _tema.form.backText,
});