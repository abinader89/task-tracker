defmodule TaskTracker.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :string
      add :desc, :string
      add :done, :boolean, default: false, null: false
      add :time_spent, :integer
      add :assigned, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:tasks, [:assigned])
  end
end
