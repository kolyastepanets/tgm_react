class Service < ApplicationRecord
  TYPES = ['electrician', 'plumber', 'gardener', 'housekeeper', 'cook'].freeze

  enum classification: Service::TYPES

  has_many :tasks

  validates :name, :classification, presence: true
  validates :classification, inclusion: { in: Service::TYPES }
end
