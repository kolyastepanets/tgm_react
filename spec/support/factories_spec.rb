require 'rails_helper'

RSpec.describe 'Factory Girl' do
  FactoryGirl.factories.map(&:name).each do |factory_name|
    describe "#{factory_name} factory" do
      it 'is valid' do
        factory = FactoryGirl.create(factory_name)
        if factory.respond_to?(:valid?)
          expect(factory).to be_valid, lambda { factory.errors.full_messages.join('\n') }
        end
      end
    end
  end
end
