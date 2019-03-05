defmodule TaskTracker.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :email, :string
      add :admin, :boolean
      add :supervisor_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create unique_index(:users, [:email])
    create index(:users, [:supervisor_id])
  end
end
