# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TaskTracker.Repo.insert!(%TaskTracker.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias TaskTracker.Repo
alias TaskTracker.Users.User

Repo.insert!(%User{name: "alice", email: "alice@example.com"})
Repo.insert!(%User{name: "Bob", email: "bob@example.com"})
Repo.insert!(%Task{title: "Do homework", desc: "homework sucks", user_id: 0})
Repo.insert!(%Task{title: "Go Shower", desc: "super wet", user_id: 1})
